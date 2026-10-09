import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/maximum-cardio-info")({
  head: () => ({
    meta: [
      { title: "Maximum Cardio — Know More | Ray's Healthy Living" },
      {
        name: "description",
        content:
          "Learn more about Maximum Cardio — a scientifically formulated supplement designed to optimise heart and cardiovascular health.",
      },
    ],
  }),
  component: MaximumCardioInfoPage,
});

function MaximumCardioInfoPage() {
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
