import { useState, type CSSProperties } from "react";

const kitchenImages = import.meta.glob<string>(
  "../assets/images/kitchen/*.webp",
  { eager: true, query: "?url", import: "default" },
);

const hallImages = import.meta.glob<string>(
  "../assets/images/hall/*.webp",
  { eager: true, query: "?url", import: "default" },
);

const filters = [
  "All",
  "Kitchen",
  "Bedrooms",
  "Living Area",
  "Other Spaces",
];
const projects: {
  id: string;
  category: string;
  title: string;
  tags: string[];
  description: string;
  image?: string;
}[] = [
  ...Object.entries(kitchenImages)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, image], index) => ({
    id: `kitchen-${path.split("/").pop()?.replace(".webp", "")}`,
    category: "Kitchen",
    title: index === 0 ? "The Everyday Kitchen" : `Kitchen Design ${index + 1}`,
    tags: ["Kitchen"],
    image,
    description:
      "A practical kitchen with appliance-ready planning and storage for everyday living.",
  })),
  {
    id: "gate",
    category: "Interiors",
    title: "Electric Gate & Driveway Planning",
    tags: ["Other Spaces"],
    description:
      "Plan the entrance, driveway and electrical provisions before the finishing work begins.",
  },
  {
    id: "utility",
    category: "Utility",
    title: "Utility Without Compromise",
    tags: ["Other Spaces"],
    description:
      "Make room for appliances, plumbing and the everyday routines that keep a home running.",
  },
  {
    id: "bedroom",
    category: "Bedrooms",
    title: "A Bedroom That Evolves",
    tags: ["Bedrooms"],
    description:
      "A comfortable bedroom planned to adapt as your family’s needs change.",
  },
  ...Object.entries(hallImages)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, image], index) => ({
      id: `living-area-${path.split("/").pop()?.replace(".webp", "")}`,
      category: "Living Area",
      title: index === 0 ? "A Welcoming Living Area" : `Living Area Design ${index + 1}`,
      tags: ["Living Area"],
      image,
      description:
        "A thoughtfully planned hall designed for everyday living and gathering.",
    })),
];
const allProjects = [
  projects.find((project) => project.tags.includes("Kitchen")),
  projects.find((project) => project.id === "gate"),
  projects.find((project) => project.id === "utility"),
  projects.find((project) => project.tags.includes("Bedrooms")),
  projects.find((project) => project.tags.includes("Living Area")),
].filter((project) => project !== undefined);

export default function OurWork() {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All"
    ? allProjects
    : projects.filter((p) => p.tags.includes(filter)).slice(0, 5);
  return (
    <section
      className="our_work section"
      id="our-work"
      aria-labelledby="work-title"
    >
      <div className="container">
        <div className="section-heading">
          {/* <span className="eyebrow">02 / Our Work</span> */}
          <h2 id="work-title">One Home. More Possibilities.</h2>
          <p>
            A home is not finished when the interiors are installed. It evolves
            with your lifestyle. Our consultation helps you prepare for what
            comes next.
          </p>
        </div>
        <div
          className="our_work__filters"
          role="group"
          aria-label="Filter projects"
        >
          {filters.map((item) => (
            <button
              type="button"
              key={item}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          {shown.length} projects shown
        </p>
        <div className="our_work__grid" key={filter}>
          {shown.map((project) => (
            <button
              type="button"
              key={project.id}
              className={`our_work__project our_work__project--${project.id}`}
              style={
                project.image
                  ? ({ "--background-image": `url("${project.image}")` } as CSSProperties)
                  : undefined
              }
              aria-label={project.title}
            />
          ))}
        </div>
        {/* <div className="our_work__partners"><span className="eyebrow">Collaboration</span><div className="our_work__partner-row"><h3>Trusted by homeowners &amp; businesses</h3>
      <div className="our_work__logos" aria-label="Sample partner logos">{[1,2,3,4].map(i => <span key={i} className="our_work__logo" role="img" aria-label="Logoipsum sample logo" />)}</div>
      </div></div> */}
      </div>
    </section>
  );
}
