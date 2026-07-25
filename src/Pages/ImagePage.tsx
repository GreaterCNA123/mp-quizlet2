import { useState } from "react";
export default function ExternalAPi() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState("");
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files?.[0];
    if (!picked) return;
    setFile(picked);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(picked));
    setUploadedUrl(null);
    setStatus("idle");
  }
  async function handleUpload() {
    if (!apiKey || !file) return;
    setStatus("uploading");
    setError(null);
    try {
      const formData = new FormData();
      formData.append("key", apiKey);
      formData.append("image", file);
      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (!data) throw new Error(data.error?.message ?? "Upload Failed");
      setUploadedUrl(data.data.URL);
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something Went Wrong");
      setStatus("error");
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Type Your API Key Here"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {previewUrl && (
        <div>
          <p>local preview</p>
          <img src={previewUrl} alt="local preview" className="maw-w-400" />
          <button
            onClick={handleUpload}
            disabled={status === "uploading" || !apiKey}
          >
            {status === "uploading" ? "...Uploading" : "Uploaded to imgbb."}
          </button>
        </div>
      )}
      {status === "done" && uploadedUrl && (
        <div>
          <p>Uploaded! Permanant URL</p>
          <a href={uploadedUrl} target="_blank" rel="nonreferrer">
            {uploadedUrl}
          </a>
          <img
            src={uploadedUrl}
            alt="Uploaded"
            style={{ maxWidth: 400, marginTop: 8 }}
          />
        </div>
      )}
      {status === "error" && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
}
