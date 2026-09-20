import { createFileRoute, Link } from "@tanstack/react-router";
import { Play } from "lucide-react";

export const Route = createFileRoute("/maximum-cardio-video")({
  head: () => ({
    meta: [
      { title: "Maximum Cardio Videos | Ray's Healthy Living" },
      {
        name: "description",
        content:
          "Watch Maximum Cardio testimonials, tutorials, and health education videos from Ray's Healthy Living.",
      },
      { property: "og:title", content: "Maximum Cardio Videos | Ray's Healthy Living" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: MaximumCardioVideoPage,
});

const videos = [
  { id: "EWhz70EY1F8", title: "Maximum Cardio – Overview" },
  { id: "PLzbA9PVX1I", title: "Heart Health Benefits" },
  { id: "_W1EC9Kf5Go", title: "Cardiovascular Support Guide" },
  { id: "Wz3YHGwYZaY", title: "Customer Testimonial #1" },
  { id: "rRHrGRtR8dU", title: "Customer Testimonial #2" },
  { id: "0VhUk34vxc4", title: "Customer Testimonial #3" },
  { id: "zbsV19Ybnqg", title: "Ingredients Breakdown" },
  { id: "ye1s_TUpqA8", title: "How to Use Maximum Cardio" },
  { id: "VqT8IHTcZxo", title: "Before & After Stories" },
  { id: "JyNE35rBf1U", title: "Doctor's Review" },
  { id: "I0jAI9cbL60", title: "Circulation & Endurance" },
  { id: "OTwLCi6-87E", title: "Blood Pressure Support" },
  { id: "hu4iWHwY9NU", title: "Energy & Stamina Tips" },
  { id: "ZW8QpC7YPpc", title: "Natural Cardio Wellness" },
  { id: "s0er1M_pHtM", title: "Live Q&A Session" },
  { id: "KP7CGl-8zNM", title: "Ray's Healthy Living Intro" },
];

function VideoCard({ id, title }: { id: string; title: string }) {
  const thumbnailUrl = `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
  const watchUrl = `https://www.youtube.com/watch?v=${id}`;

  return (
    <a
      href={watchUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-red-300 transition-all duration-200"
      aria-label={`Watch: ${title}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <img
          src={thumbnailUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 shadow-lg">
            <Play className="h-6 w-6 text-white fill-white translate-x-0.5" aria-hidden="true" />
          </div>
        </div>
        {/* YouTube badge */}
        <div className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-white">
          YouTube
        </div>
      </div>

      {/* Card footer */}
      <div className="flex flex-1 flex-col gap-1 p-3">
        <p className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 group-hover:text-red-600 transition-colors">
          {title}
        </p>
        <p className="mt-auto text-xs text-gray-400">Maximum Cardio</p>
      </div>
    </a>
  );
}

function MaximumCardioVideoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-red-700 to-red-600 py-12">
        <div className="container-rhl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-red-200 mb-2">
            Maximum Cardio
          </p>
          <h1 className="text-3xl font-bold text-white sm:text-4xl mb-3">
            Video Library
          </h1>
          <p className="text-red-100 max-w-xl mx-auto text-base">
            Testimonials, tutorials and health education — everything you need to know about Maximum Cardio.
          </p>

          {/* Breadcrumb links */}
          <div className="mt-6 flex items-center justify-center gap-3 text-sm">
            <Link
              to="/maximum-cardio"
              className="px-4 py-2 rounded-md bg-white/15 text-white hover:bg-white/25 transition-colors font-medium"
            >
              ← Know More
            </Link>
            <Link
              to="/shop"
              className="px-4 py-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white transition-colors font-semibold"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Video grid */}
      <section className="section-y">
        <div className="container-rhl">
          <p className="text-sm text-gray-400 mb-6">
            {videos.length} videos · Click any card to watch on YouTube
          </p>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {videos.map((v) => (
              <VideoCard key={v.id} id={v.id} title={v.title} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 py-14">
        <div className="container-rhl text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Ready to support your heart health?
          </h2>
          <p className="text-red-100 mb-6 max-w-lg mx-auto">
            Join thousands of customers who trust Maximum Cardio for comprehensive cardiovascular support.
          </p>
          <Link
            to="/shop"
            className="inline-block px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white text-base font-semibold rounded transition-colors"
          >
            Shop Maximum Cardio
          </Link>
        </div>
      </section>
    </div>
  );
}
