import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { Star } from "lucide-react";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer Reviews | Ray's Healthy Living" },
      {
        name: "description",
        content:
          "Read verified Google customer reviews for Ray's Healthy Living — 5-star rated wellness store in Prince Frederick, Maryland.",
      },
    ],
  }),
  component: ReviewsPage,
});

const reviews = [
  {
    name: "Jason Reed",
    date: "Jul 2026",
    text: "Changed my life",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "Kenesha Davis",
    date: "Mar 2026",
    text: "Love this store! Ray is very knowledgeable and also has educational material on health products available.",
    meta: "on Google",
    rating: 5,
    badge: "Local Guide · 19 reviews",
  },
  {
    name: "Scott Fegan",
    date: "Sep 2025",
    text: "I stopped by Ray's recently and was really impressed! Ray knows his stuff. The store is well-organized with a great selection of vitamins and natural remedies. Good spot for anyone looking to support their health.",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "Ida Gross",
    date: "Aug 2025",
    text: "Omg, where do I start? I am a cancer patient who is currently in remission! I stumbled across Mr. Ray and his health store and I'd like to think he is playing a major part in my recovery. He's knowledgeable, patient, and very compassionate, I'm thankful for him being a part of my journey.",
    meta: "on Google",
    rating: 5,
    badge: "Local Guide · 8 reviews",
    ownerReply:
      "Hello Ida, thank you for the great review. We loved having you in the store and getting to know your story. We hope to see you again. - Rayman Khan",
  },
  {
    name: "Robert Gillett",
    date: "Jul 2025",
    text: "You can go to a grocery or drug store and take your chances, or you can visit Ray's and quickly upgrade your health. You always come out with something, including an education in healthy living.",
    meta: "on Google",
    rating: 5,
    ownerReply:
      "Hi Robert, you're the best. Thank you for the great review. I'm looking forward to see you soon.",
  },
  {
    name: "Holly Grimes",
    date: "Nov 11th, 2023",
    text: "Highest quality supplements hands down. Ray is helpful in every way. Been coming here for many years!",
    meta: "on Google",
    rating: 5,
    badge: "Local Guide · 33 reviews · 8 photos",
    ownerReply:
      "Hi Holly! Thank you for the pleasant review, and we hope to see you again soon. - Rayman Khan",
  },
  {
    name: "Lillie Mattingly",
    date: "Oct 2023",
    text: "Great knowledge",
    meta: "on Google",
    rating: 5,
    ownerReply:
      "Hi Lillie, thank you for the review! I hope we sufficiently helped you, and let us know if you need anything else! - Rayman Khan",
  },
  {
    name: "piggy and sans yeet",
    date: "Nov 7th, 2023",
    text: "Ray is so kind and helpful! He knows just what I need. He actually takes time to understand what you are actually looking for!",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "monique washington",
    date: "Sep 29th, 2023",
    text: "I lovvvvveeeeeee Ray and his healthy healing plan....... visited his store today September 29th 2023 , he took his time with my girlfriend and I he gave us samples,so much knowledge, I purchased the best Seamoss I ever taste and I been taking Seamoss for years, I STRONGLY RECOMMEND ESP WATER, that water healed my girlfriend sore throat on the spot I can go on and on about this place.... I'm from Philly but I will be back soon LOVE YOU RAY",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "Rama Latin",
    date: "Sep 19th, 2023",
    text: "I LOVE going into Rays - Healthy Living. Its always time well spent, I am learning how to care for myself and my family. My health is wealth goes without saying, I am extremely blessed every time I go in the store. If you havent been to this store (Located in Prince Frederick) Run dont walk, you wont be disappointed. Trust me!",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "Irene Blackson",
    date: "Aug 4th, 2023",
    text: "My name is Irene, and my favorite destination for health-focused products and advice in Prince Frederick is Ray's Healthy Living Store. A couple months ago, I broke my ankle after a slip in my apartment. My doctor ended up giving me a foot brace, and it was a struggle to move around the house. Out of desperation, I sought out Ray. He gave me various supplements that ended up speeding my recovery greatly, and in less than 3 weeks I was out and walking without my foot brace. Another notable experience at Ray's Healthy Living Store was when I was grappling with a persistent thyroid issue for a year. The problem was showing no signs of improvement, despite the medication prescribed to me. Seeing how my ankle healed so quickly, I decided to give the nature-based medicine another chance. I had stopped by and spoke to ray about the issue, and that was when he told me about Sea Moss. I had tried it for a couple of weeks before having blood work done. When it was time for my bloodwork, both me and my doctor were shocked to see that my thyroid hormone production was perfectly normal, despite it being astoundingly rocky over the past year. If you want to feel great, and have your body working in ideal conditions, Rays Healthy Living store is the best place to go in Prince Frederick, and arguably, the entire state of Maryland. Thank you, Ray, for always having amazing customer service, and the help you've brought me and many others.",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "St Johns Wort",
    date: "Feb 11th, 2023",
    text: "It helps with anxiety and depression. I have it really bad nowadays. My therapist wanted too put me on antidepressants and I decided to give this a try. I havent really had a negative/depressing thought since I started taking it.",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "Linessa Brown",
    date: "Jul 10th, 2023",
    text: "",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "Ralph Curtis",
    date: "Jun 21st, 2023",
    text: "Ray has reasonable prices ,gives discounts and always gives knowledge on his products. Plus he is a cool dude to talk to.",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "Chris Garner",
    date: "Jun 18th, 2023",
    text: "I love this place. Good selection of stuff and owners very personable and knowledgeable. Highly Recommend",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "Savannah Brock",
    date: "Jun 17th, 2023",
    text: "The sweetest man ! Helped me find prenatals for my specific needs and a detox for my daughter ! Even threw in some free stuff for me to try definitely coming back for all my needs !",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "Roxie Rivera",
    date: "Apr 29th, 2023",
    text: "Very knowledgeable!",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "Steven Elliott",
    date: "Apr 17th, 2023",
    text: "By far one of the best store in this area. The customer service was so great! And this store has so much to offer, whatever you may need. I just walked in to see what the store was all about. We don't see a lot of herbal shop on this side of town, so I was super press to see what, a store like this offer. & boy was I surprise! Not only was I greeted as soon I walked in, but I was able to get great information on several items I was interested in getting. I definitely will be returning, love supporting local shops, especially one with phenomenal customer service like this one!",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "James Mbah",
    date: "Jan 28th, 2023",
    text: "Rays Maximum Cardio is by far the best dietary supplement I have come across. You immediately feel the difference and the shift within once you begin to apply use. This product lives up to everything it states from energy, strength, mental clarity, stamina, immunity & muscle growth! Rays Maximum Cardio has truly helped to make me feel 10-15 yrs younger and even surprise & surpass physical limitations that were once a barrier for myself. I have been using Rays Maximum Cardio for about 3-4 yrs and as long as its available & I am alive, I will continue to use. I also have tried other Rays Healthy Living products such as teas, herbs, and bitters All have great quality, quantity, results, and price. Rays Healthy Living always comes through, I am truly a satisfied customer with the excellent service and products!",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "Justin Holt",
    date: "Nov 30th, 2022",
    text: "Sea moss gel on point!",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "J Jeffery",
    date: "Nov 20th, 2022",
    text: "High quality products that work in a short period of time!",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "Crystal Goldring",
    date: "Nov 17th, 2022",
    text: "I visit Rays often and as much as possible!!! It is extremely important now to care for your inner self. Our immunity, organs and mental health need more than what a daily diet can provide. I enjoy my visits immensely. I can definitively say, you will not find a business today like Rays. I recommend anyone to just visit, you will leave with a wealth of knowledge to construct a daily regimen that best works for you. Ray values customers and takes great pride in providing quality products.",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "Christina Numera-Segreti",
    date: "Oct 15th, 2022",
    text: "Love this store! Ray is full of knowledge and cares about every person that walks through the door. He attentively listens to what you have to say and then helps you to make the right purchase. Be sure to check out the store and get a fabulous personal experience!",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "Belinda Barber",
    date: "Oct 6th, 2022",
    text: "I absolutely love that Rays Healthy Living is located in my backyard (Prince Frederick). The store always has what I need and if not, the owner Mr. Ray will order it for me. His prices are reasonable and offers discounts. Hes knowledgeable and will gives samples without you making a purchase. Ray genuinely cares about the health of the community. Thank you Rays Healthy Living for bringing whole health and wellness to Calvert County. I dont have to leave out the county to purchase my health products anymore.",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "Jarmar Coates",
    date: "Aug 29th, 2022",
    text: "Thank you Ray for my sea moss",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "Janice",
    date: "Aug 14th, 2022",
    text: "Ray is awesome and a very friendly guy! He knows his products! Every time I shop at his store, Im always learning something new from him of what certain herbal supplements can positively do for our body. I love how he shows me actual books on the information about certain herbs. I love that I always feel like Im getting an education as I shop! What I love that all his products is are natural. The best one Ive been taking is his Maximum Cardio and Ive noticed a huge difference! I noticed my moods have improved. I feel a lot more energized. I feel like I get more out of my work outs at gym when I do cardio. I noticed my appetite has changed as well where I dont find myself snacking a lot like I used too so its definitely helping with my weight loss journey since Im getting the proper vitamins that my body needs in order to function!! Im on my 3rd container so far and Im planning on buying more!!",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "St Leonard Development",
    date: "Jul 31st, 2022",
    text: "this is a great local resource.",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "jazzbystarlite",
    date: "Jul 26th, 2022",
    text: "I was looking for a all natural supplement that would give me an energy boost without fillers or additives. His recipe of Irish Moss is the answer. While his knowledge and genuine warmth are reasons enough to visit the store, the product are great and will not leave you disappointed. Allen B.",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "sebrina singleton",
    date: "Jun 3rd, 2022",
    text: "Ive been ordering different supplements and Rays cardio for a while and they are all excellent products that I greatly recommend. The level of customer service and knowledge is impeccable Im truly satisfied with all recommendations given. A satisfied customer for life much continued success and blessings.",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "Deandre Boodhoo-Howard",
    date: "May 28th, 2022",
    text: "I highly recommend going to Rays Healthy Living. I had a chest injury that I was told would take 3 or more months to heal. Ray had giving me the remedy for a fast recovery. I astounded by the results. I wouldnt recommend going anywhere for vitamins and etc besides this place.",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "Miranda Paige Beauty",
    date: "May 14th, 2022",
    text: "So helpful, educational & friendly. Amazing service. I am Sad I had not visited this place sooner. Thank you!",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "Barbara Butler",
    date: "May 11th, 2022",
    text: "Mr. Ray's knowledge, friendliness, wisdom and expertise is impeccable. He takes the time to explain thoroughly all the benefits of each product and has the books also. The store is well stocked with a variety of products to promote healthy living. I've purchased the sea moss, dandelion root tea, maximum cardio and the salmon fish powder 100% natural collagen and i'm feeling awesome! Thanks, Mr. Ray!",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "Mikki Ward",
    date: "Apr 9th, 2022",
    text: "If your health matters to you, Rays Healthy Living is where you want go! I visited several weeks ago wanting to find a weight loss regime, what I found was so much more. Mr. Ray explained how the body gain and retains weight. I never thought of the trace amounts of sugars and sodium in the so called healthy foods we purchase. Mr Ray promotes cooking foods and taking vitamins and minerals the body needs to sustain health. I purchased an array of items for my journey including, Rays Oregano oil and dandelion tea. By following a daily regime change has began. I started my journey weighing 245. Today, 2 weeks later Im at 242. Im so proud of the 3 pounds, for I know over time these extra pounds will not return! Consistency is the key for success! Thank you Mr. Ray! Ill be back to re-up in a few weeks",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "Katrina Rice",
    date: "Feb 10th, 2022",
    text: "It amazes me how knowledgeable Ray is. He really take the time to explain every detail to you. His products are amazing. He gave several samples. Prices are VERY reasonable. Sea Moss is great. I will be handing over my paycheck next visit lol. Thanks Ray!",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "Anthony Feliz Moya",
    date: "Jan 12th, 2022",
    text: "Sea moss gel looks and taste great!!! Ray was very friendly and shared a lot of information with me on health. Will definitely be back to buy more.",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "Michelle Taylor",
    date: "Oct 6th, 2021",
    text: "Great energy, friendly service, very knowledgeable of products and their function. High quality products. I REALLY love this store!",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "Tiauna Quarles",
    date: "Feb 3rd, 2021",
    text: "I recommend Rays to anybody looking to change your lifestyle for the better, whether that be detoxing, boosting your immune system etc. Mr. Ray really cares about his customers, and thats rare! Go shop with him, you wont be disappointed.",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "Erin Knowles",
    date: "Nov 14th, 2020",
    text: "Great store with knowledgeable friendly staff!!",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "shawn pratt",
    date: "Sep 13th, 2020",
    text: "It's awesome he knows the stuff you need some stuff you need vitamins you need CBD oils and creams the help of back pain he has a very good store",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "Stacey Savoy",
    date: "Jun 17th, 2020",
    text: "I went in with a lot of questions, he answered every question. Very friendly, even give samples to test before you buy. Will be returning.",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "Albert Nelson",
    date: "Apr 5th, 2020",
    text: "Ray knows his stuff.. very helpful and knowledgeable. He stands by his products so much that he had given me a free sample. I will definatly be returning.",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "david fegan",
    date: "Feb 29th, 2020",
    text: "Great place, highly recommend.",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "Caleb Fry",
    date: "Dec 15th, 2019",
    text: "This man went far out of his way to help me detoxify my body and gave me new insights on how to do it effectively. He understands functional medicine enough to explain it simply and provides what you need in order to heal yourself. He deserves your business",
    meta: "on Google",
    rating: 5,
  },
  {
    name: "Lisa Hogue",
    date: "May 11th, 2019",
    text: "Great place, wide selection and helpful friendly staff!",
    meta: "on Google",
    rating: 5,
  },
];

const PAGE_SIZE = 6;

// Deterministic avatar colour based on first letter
const avatarColor = (name: string) => {
  const colours = [
    "#2563eb", "#16a34a", "#9333ea", "#dc2626",
    "#ea580c", "#0891b2", "#7c3aed", "#be185d",
  ];
  return colours[(name.charCodeAt(0) ?? 0) % colours.length] ?? "#2563eb";
};

function ReviewsPage() {
  const [page, setPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.max(1, Math.ceil(reviews.length / PAGE_SIZE));

  const paged = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return reviews.slice(start, start + PAGE_SIZE);
  }, [page]);

  const goTo = (p: number) => {
    setPage(p);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Build page number buttons — always show first, last, current ±1, with ellipsis
  const pageButtons = () => {
    const pages: (number | "…")[] = [];
    const add = (n: number) => { if (!pages.includes(n)) pages.push(n); };
    add(1);
    if (page > 3) pages.push("…");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) add(i);
    if (page < totalPages - 2) pages.push("…");
    if (totalPages > 1) add(totalPages);
    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Customer Reviews — Ray's Healthy Living
          </h1>
          <Link
            to="/"
            className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-colors"
          >
            Back
          </Link>
        </div>
      </div>

      {/* Reviews list */}
      <div ref={topRef} className="max-w-3xl mx-auto px-4 py-8 space-y-4">
        {paged.map((r, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
                style={{ background: avatarColor(r.name) }}
              >
                {r.name.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                {/* Name + stars row */}
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <span className="font-semibold text-gray-900">{r.name}</span>
                    {" "}
                    <span className="text-sm text-gray-400">{r.meta}</span>
                    {r.badge && (
                      <p className="text-xs text-blue-600 font-medium mt-0.5">{r.badge}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-0.5">{r.date}</p>
                  </div>
                  <div className="flex gap-0.5 flex-shrink-0">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${s <= (r.rating ?? 5) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Review text */}
                {r.text && (
                  <p className="mt-3 text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                    {r.text}
                  </p>
                )}

                {/* Owner reply */}
                {r.ownerReply && (
                  <div className="mt-4 ml-2 pl-4 border-l-2 border-green-400 bg-green-50 rounded-r-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[10px] font-bold">R</span>
                      </div>
                      <span className="text-xs font-bold text-green-800">
                        Ray's Healthy Living (owner)
                      </span>
                    </div>
                    <p className="text-xs text-green-900 leading-relaxed whitespace-pre-line">
                      {r.ownerReply}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="max-w-3xl mx-auto px-4 pb-16 flex items-center justify-center gap-2 flex-wrap">
        <button
          onClick={() => goTo(Math.max(1, page - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg disabled:opacity-40 hover:bg-gray-700 transition-colors"
        >
          Prev
        </button>

        {pageButtons().map((btn, i) =>
          btn === "…" ? (
            <span key={`ellipsis-${i}`} className="px-2 text-gray-500 select-none">
              …
            </span>
          ) : (
            <button
              key={btn}
              onClick={() => goTo(btn as number)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                page === btn
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {btn}
            </button>
          )
        )}

        <button
          onClick={() => goTo(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg disabled:opacity-40 hover:bg-gray-700 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
