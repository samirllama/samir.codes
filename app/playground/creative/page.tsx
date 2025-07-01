import CreativeCanvas from "@/components/CreativeCanvas";

export default function CreativePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <CreativeCanvas text="Art is the expression of the soul." />
    </div>
  );
}