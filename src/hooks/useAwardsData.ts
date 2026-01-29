import { useState, useEffect } from "react";

interface Host {
  id: string;
  name: string;
  image_url: string;
  role: string;
  sort_order: number;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  sort_order: number;
}

interface GalleryItem {
  id: string;
  image_url: string;
  type: "photo" | "video";
  title: string | null;
  youtube_url: string | null;
  sort_order: number;
}

interface Award {
  id: string;
  title?: string | null;
  description?: string | null;
  hero_image_url?: string | null;
  [key: string]: unknown;
}

export function useAwardHosts(awardId: string | undefined) {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!awardId) return;

    async function fetchHosts() {
      try {
        setLoading(true);
        const response = await fetch(`/api/awards/${awardId}/hosts`);
        if (!response.ok) throw new Error("Failed to fetch hosts");
        const data = await response.json();
        setHosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchHosts();
  }, [awardId]);

  return { hosts, loading, error };
}

export function useAwardCategories(awardId: string | undefined) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!awardId) return;

    async function fetchCategories() {
      try {
        setLoading(true);
        const response = await fetch(`/api/awards/${awardId}/categories`);
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, [awardId]);

  return { categories, loading, error };
}

export function useAwardGallery(awardId: string | undefined) {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!awardId) return;

    async function fetchGallery() {
      try {
        setLoading(true);
        const response = await fetch(`/api/awards/${awardId}/gallery`);
        if (!response.ok) throw new Error("Failed to fetch gallery");
        const data = await response.json();
        setGallery(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchGallery();
  }, [awardId]);

  return { gallery, loading, error };
}

export function useAwards() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAwards() {
      try {
        setLoading(true);
        const response = await fetch("/api/awards");
        if (!response.ok) throw new Error("Failed to fetch awards");
        const data = await response.json();
        setAwards(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchAwards();
  }, []);

  return { awards, loading, error };
}
