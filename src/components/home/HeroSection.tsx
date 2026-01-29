"use client";
import { useState, useEffect } from "react";
import { Link } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroSlide {
  id: string;
  slide_type: string;
  title: string;
  subtitle: string;
  date_label: string;
  cta_text: string;
  cta_link: string;
  learn_more_link: string;
  background_image: string;
  sort_order: number;
}

export const HeroSection = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch slides from API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch("/api/homepage/hero");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setSlides(data);
          }
        }
      } catch (error) {
        console.error("Error fetching hero slides:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSlides();
  }, []);

  // Auto-rotate slides
  useEffect(() => {
    if (slides.length <= 1) return;
    
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAnimating(false);
      }, 500);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  // Show nothing or minimal section if no slides
  if (!isLoading && slides.length === 0) {
    return (
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto px-4 lg:px-8 text-center pt-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
            Welcome to Astra
          </h1>
          <p className="text-lg text-muted-foreground">
            Content coming soon...
          </p>
        </div>
      </section>
    );
  }

  // Don't render content until we have data
  if (!slide) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background z-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}
      
      {/* Background Image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url('${slide.background_image}')`,
          opacity: isAnimating ? 0.3 : 1,
        }}
      />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/50 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-24">
        <div className="max-w-3xl">

          {/* Date Badge */}
          <div
            className={cn(
              "inline-flex items-center gap-2 bg-primary/20 border border-primary/40 rounded-full px-4 py-2 mb-6 transition-all duration-500",
              isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            )}
          >
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{slide.date_label}</span>
          </div>

          {/* Title */}
          <h1
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-foreground leading-tight mb-6 transition-all duration-500",
              isAnimating ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
            )}
          >
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p
            className={cn(
              "text-lg md:text-xl text-muted-foreground mb-10 max-w-xl transition-all duration-500 delay-100",
              isAnimating ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
            )}
          >
            {slide.subtitle}
          </p>

          {/* CTA Buttons */}
          <div
            className={cn(
              "flex flex-wrap items-center gap-4 transition-all duration-500 delay-200",
              isAnimating ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
            )}
          >
            <Link href={slide.learn_more_link || "#"}>
              <Button variant="hero-outline" size="lg">
                Learn more
              </Button>
            </Link>
            <Link href={slide.cta_link || "#"}>
              <Button variant="hero" size="lg">
                {slide.cta_text}
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="rounded-full w-12 h-12 border border-primary/30 hover:bg-primary hover:text-primary-foreground">
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex items-center gap-2 mt-16">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAnimating(true);
                setTimeout(() => {
                  setCurrentSlide(index);
                  setIsAnimating(false);
                }, 300);
              }}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                currentSlide === index
                  ? "bg-primary w-12"
                  : "bg-muted-foreground/30 w-6 hover:bg-muted-foreground/50"
              )}
            />
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
