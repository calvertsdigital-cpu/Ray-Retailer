import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/maximum-cardio")({
  component: MaximumCardioPage,
});

function MaximumCardioPage() {
  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
      <img
        src="/Maximum Cardio.png"
        alt="Maximum Cardio"
        style={{ width: "100%", height: "100%", display: "block", objectFit: "contain" }}
      />
    </div>
  );
}
