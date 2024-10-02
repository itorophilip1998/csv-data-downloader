// src/index.ts

export const downloadCSV = <T>(
  data: T[],
  options: { headers: (keyof T)[]; filename?: string }
): string | void => {
  const { headers, filename = "data.csv" } = options;

  if (!data || !data.length) {
    return "No data available to download.";
  }

  if (!headers || !headers.length) {
    return "No headers provided for CSV.";
  }

  // Map data to CSV format based on dynamic headers
  const rows = data.map((item) =>
    headers.map((header) => item[header] as string | number | boolean | null)
  );

  // Combine headers and rows
  const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");

  // Create a Blob from CSV content
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  // Create download link and trigger the download
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
