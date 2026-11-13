// E2E: solicitud de contacto → calendario propio → reserva → cambio de hora → corrección.
// Cal.com y Netlify se simulan; no sale ninguna petición real.
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const SITE = readFileSync(fileURLToPath(new URL('../../dist/web/site/index.html', import.meta.url)));
const ORIGIN = 'https://vispoandco.test/';
const CORS = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': 'GET,POST' };

function slots() {
  const data = {};
  for (let i = 1; i < 12; i++) {
    const d = new Date(Date.now() + i * 864e5);
    if (d.getDay() % 6 === 0) continue;
    const k = d.toISOString().slice(0, 10);
    data[k] = ['09:00', '09:30', '10:00', '11:30', '16:00'].map((t) => ({ start: `${k}T${t}:00.000+01:00` }));
  }
  return data;
}

const browser = await chromium.launch();
try {
  for (const [width, height] of [[1280, 900], [390, 844]]) {
    const page = await browser.newPage({ viewport: { width, height } });
    const calls = [], errors = [], crm = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.route('**/*', (route) => {
      const req = route.request(), url = req.url();
      if (req.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
      if (url.includes('/rest/v1/rpc/web_lead')) { crm.push(JSON.parse(req.postData()).p); return route.fulfill({ status: 204, headers: CORS }); }
      if (url === ORIGIN && req.method() === 'POST') { calls.push('form'); return route.fulfill({ status: 200, body: 'ok' }); }
      if (url === ORIGIN) return route.fulfill({ body: SITE, contentType: 'text/html' });
      if (url.includes('api.cal.com/v2/slots')) return route.fulfill({ headers: CORS, contentType: 'application/json', body: JSON.stringify({ status: 'success', data: slots() }) });
      if (url.includes('/reschedule')) { calls.push('reschedule'); return route.fulfill({ status: 201, headers: CORS, contentType: 'application/json', body: '{"status":"success","data":{"uid":"b2"}}' }); }
      if (url.includes('api.cal.com/v2/bookings')) { calls.push('booking'); return route.fulfill({ status: 201, headers: CORS, contentType: 'application/json', body: '{"status":"success","data":{"uid":"b1"}}' }); }
      return route.abort();
    });

    await page.goto(ORIGIN);
    await page.locator('#contacto').scrollIntoViewIfNeeded();
    await page.click('#ctSend');
    assert.match(await page.locator('#qErr').textContent(), /opción/, 'pide un servicio');
    await page.locator('#ctSvc .opt').first().click();
    await page.selectOption('#q-sec', { index: 4 });
    await page.selectOption('#q-now', { index: 1 });
    await page.fill('#q-name', 'Laura');
    await page.fill('#q-biz', 'Lumen');
    await page.fill('#q-mail', 'laura@lumen.es');
    await page.check('#q-priv');
    await page.click('#ctSend');

    await page.locator('.nct').nth(2).click();
    await page.click('#ncGo');
    await page.locator('#ncMove').waitFor();
    assert.equal(await page.locator('#qdSum').isHidden(), true, 'resumen oculto');

    await page.click('#ncMove');
    await page.locator('.nct').nth(4).click();
    await page.click('#ncGo');
    await page.locator('#ncMove').waitFor();

    await page.locator('#qdActs .btn').last().click();
    await page.fill('#q-biz', 'Lumen Café');
    await page.click('#ctSend');
    await page.locator('#ncMove').waitFor();

    assert.deepEqual(calls, ['form', 'booking', 'reschedule', 'form'], `flujo ${width}px`);
    await page.waitForTimeout(300);
    assert.equal(crm.filter((x) => x.negocio).length, 2, `solicitudes al CRM ${width}px`);
    assert.equal(crm.filter((x) => x.reunion).length, 2, `reuniones al CRM ${width}px`);
    assert.ok(crm.every((x) => /^P-[A-Z0-9]+$/.test(x.ref)) && new Set(crm.map((x) => x.ref)).size === 1, `misma referencia ${width}px`);
    assert.deepEqual(errors, [], `errores JS ${width}px`);
    console.log(`✓ ${width}px`);
    await page.close();
  }
} finally {
  await browser.close();
}
