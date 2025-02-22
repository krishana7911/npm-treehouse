import { NextResponse } from "next/server";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import util from "util";

const execPromise = util.promisify(exec);

export async function POST(req) {
  try {
    const { packageJson } = await req.json();
    if (!packageJson) {
      return NextResponse.json({ error: "package.json is required" }, { status: 400 });
    }

    const tempDir = "temp";
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    const packageJsonPath = path.join(tempDir, "package.json");
    fs.writeFileSync(packageJsonPath, packageJson);

    await execPromise(`cd ${tempDir} && npm install --package-lock-only --loglevel=error`);

    const lockFilePath = path.join(tempDir, "package-lock.json");
    const lockFileContent = JSON.parse(fs.readFileSync(lockFilePath, "utf-8"));

    return NextResponse.json({ lockFile: lockFileContent });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate package-lock.json" }, { status: 500 });
  }
}
