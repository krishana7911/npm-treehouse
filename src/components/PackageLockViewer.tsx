interface PackageLockViewerProps {
  lockFile: object | null;
}

export default function PackageLockViewer({ lockFile }: PackageLockViewerProps) {
  return (
    <div className="w-full p-4">
      <label className="text-lg font-semibold text-white">Generated package-lock.json</label>
      <div className="border border-gray-700 rounded px-4 py-2 bg-gray-900 min-h-[350px] max-h-[400px] overflow-auto text-white">
        {lockFile ? (
          <pre className="text-sm whitespace-pre-wrap break-words">{JSON.stringify(lockFile, null, 2)}</pre>
        ) : (
          <p className="text-gray-400 italic">No package-lock.json generated yet.</p>
        )}
      </div>
    </div>
  );
}
