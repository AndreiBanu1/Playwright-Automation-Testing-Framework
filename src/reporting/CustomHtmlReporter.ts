import type {
  Reporter,
  FullResult,
  Suite,
  TestCase,
  TestResult,
} from "@playwright/test/reporter";
import fs from "fs";
import path from "path";

export default class CustomHtmlReporter implements Reporter {
  private reportFile: string;
  private results: string[] = [];

  constructor() {
    const reportDir = path.join(__dirname, "..", "custom-report");
    if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir);
    this.reportFile = path.join(reportDir, `report-${Date.now()}.html`);
  }

  onBegin(config: any, suite: Suite) {
    this.results.push(`<html><head><title>Test Report</title></head><body>`);
    this.results.push(`<h1>Playwright Custom Report</h1>`);
    this.results.push(`<ul>`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const statusColor = result.status === "passed" ? "green" : result.status === "failed" ? "red" : "orange";

    this.results.push(`
      <li style="color:${statusColor};">
        <strong>${test.title}</strong> — ${result.status.toUpperCase()}
        <br/>
        <em>Duration:</em> ${result.duration}ms
        ${result.error ? `<pre>${result.error.message}</pre>` : ""}
      </li>
    `);
  }

  onEnd(result: FullResult) {
    this.results.push(`</ul>`);
    this.results.push(`<p><strong>Total status:</strong> ${result.status.toUpperCase()}</p>`);
    this.results.push(`</body></html>`);

    fs.writeFileSync(this.reportFile, this.results.join("\n"), "utf-8");
    console.log(`✅ Custom report generated: ${this.reportFile}`);
  }
}
