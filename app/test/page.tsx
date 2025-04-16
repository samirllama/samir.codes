// app/test/page.tsx
export default function TestPage() {
  return (
    <div className="p-10">
      <h1>Test Page</h1>
      <div className="mt-4 border-4 border-red-500 p-4">
        Red Border Test Div
      </div>
      <div className="mt-4 border-4 border-[rgb(var(--primary))] p-4">
        Primary Variable Border Test Div
      </div>
      <div className="mt-4 text-red-500">Red Text Test</div>
      <div className="mt-4 text-primary">Primary Variable Text Test</div>
    </div>
  );
}
