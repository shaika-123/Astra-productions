"use client";
import { useState, useEffect } from "react";

interface GalleryImage {
  id: string;
  image_url: string;
  alt_text: string;
  row_number: number;
  sort_order: number;
}

interface VisionContent {
  title: string;
  subtitle: string;
}

export const VisionSection = () => {
  const [row1Images, setRow1Images] = useState<string[]>([]);
  const [row2Images, setRow2Images] = useState<string[]>([]);
  const [content, setContent] = useState<VisionContent>({
    title: "A Cinematic Vision",
    subtitle: "Elevating Coastalwood by exploring untold stories & unseen genres in Tulu cinema.",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch gallery images
    const fetchGallery = async () => {
      try {
        const res = await fetch("/api/homepage/gallery");
        if (res.ok) {
          const data = await res.json();
          if (data.row1?.length > 0) {
            setRow1Images(data.row1.map((img: GalleryImage) => img.image_url));
          }
          if (data.row2?.length > 0) {
            setRow2Images(data.row2.map((img: GalleryImage) => img.image_url));
          }
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch vision content
    const fetchContent = async () => {
      try {
        const res = await fetch("/api/homepage/vision");
        if (res.ok) {
          const data = await res.json();
          if (data.title) {
            setContent({ title: data.title, subtitle: data.subtitle });
          }
        }
      } catch (error) {
        console.error("Error fetching vision content:", error);
      }
    };

    fetchGallery();
    fetchContent();
  }, []);

  // Don't render gallery sections if no images
  const hasRow1 = row1Images.length > 0;
  const hasRow2 = row2Images.length > 0;

  // If no images at all, just show the vision text
  if (!isLoading && !hasRow1 && !hasRow2) {
    return (
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 py-16 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              {content.title}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {content.subtitle}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Top Gallery Slider */}
      {hasRow1 && (
        <div className="relative mb-8 overflow-hidden">
          <div className="flex gap-4 animate-marquee">
            {[...row1Images, ...row1Images].map((img, index) => (
              <div
                key={index}
                className="w-64 h-40 rounded-xl overflow-hidden shrink-0"
              >
                <img
                  src={img}
                  alt="Gallery"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vision Text */}
      <div className="container mx-auto px-4 lg:px-8 py-16 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
            {content.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>
      </div>

      {/* Bottom Gallery Slider - Reverse direction */}
      {hasRow2 && (
        <div className="relative mt-8 overflow-hidden">
          <div className="flex gap-4 animate-marquee" style={{ animationDirection: "reverse" }}>
            {[...row2Images, ...row2Images].map((img, index) => (
              <div
                key={index}
                className="w-64 h-40 rounded-xl overflow-hidden shrink-0"
              >
                <img
                  src={img}
                  alt="Gallery"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
