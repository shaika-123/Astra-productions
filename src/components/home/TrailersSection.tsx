"use client";
import { useState, useEffect } from "react";
import { Play, Loader2 } from "lucide-react";

interface MediaItem {
  id: string;
  media_type: string;
  title: string;
  thumbnail: string;
  video_url: string;
  sort_order: number;
}

export const TrailersSection = () => {
  const [trailers, setTrailers] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await fetch("/api/homepage/media");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setTrailers(data);
          }
        }
      } catch (error) {
        console.error("Error fetching media:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMedia();
  }, []);

  // Don't render section if loading or no trailers
  if (isLoading || trailers.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-primary/50" />
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Trailers & Media
          </h2>
          <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-primary/50" />
        </div>

        {/* Trailers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trailers.map((trailer) => (
            <a
              key={trailer.id}
              href={trailer.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted">
                <img
                    src={trailer.thumbnail}
                    alt={trailer.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center transform scale-90 group-hover:scale-100 transition-all duration-300 shadow-lg shadow-primary/30">
                      <Play className="w-6 h-6 ml-1" />
                    </div>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  
                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-sm md:text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {trailer.title}
                    </h3>
                  </div>
                </div>
              </a>
            ))}
          </div>
      </div>
    </section>
  );
};
