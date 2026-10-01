import { Link } from "react-router-dom";
import type { Post } from "@/data/posts";

export type BlogPost = Post;

export interface BlogCardProps {
  post: Post;
  size?: 'small' | 'large';
  featured?: boolean;
}

// Category background colors fallback
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'AI Engineering': '#c8a96e',
    'Machine Learning': '#c4b5a0',
    'Interview Prep': '#a0b5c4',
    'Career': '#b5a0c4',
    'Python': '#a0c4b5',
    'AWS': '#d4bfa8',
    'AI Systems': '#b8c4a0',
    'default': '#c4bdb5'
  };
  return colors[category] || colors.default;
}

// Category cover images
export function getCategoryCoverImage(category: string): string {
  const covers: Record<string, string> = {
    'AI Engineering': '/blog/cover_ai_engineering.jpg',
    'Machine Learning': '/blog/cover_machine_learning.jpg',
    'Python': '/blog/cover_python.jpg',
    'AWS': '/blog/cover_aws.jpg',
    'Interview Prep': '/blog/cover_interview_prep.jpg',
    'Career': '/blog/cover_career.jpg',
    'AI Systems': '/blog/cover_ai_systems.jpg',
    'default': '/blog/cover_machine_learning.jpg'
  };
  return covers[category] || covers.default;
}

export function BlogCard({ post, size = 'small', featured }: BlogCardProps) {
  const cardSize = featured ? 'large' : size;
  const coverUrl = post.coverImage || getCategoryCoverImage(post.category);

  return (
    <Link
      to={`/blog/${post.slug}`}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      {/* Thumbnail — Professional cover image */}
      <div style={{
        width: '100%',
        aspectRatio: cardSize === 'large' ? '16/9' : '4/3',
        backgroundColor: getCategoryColor(post.category),
        borderRadius: '4px',
        marginBottom: '16px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <img
          src={coverUrl}
          alt={post.title}
          onError={(e) => {
            e.currentTarget.src = '/blog/cover_machine_learning.jpg';
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.4s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.25) 100%)',
          pointerEvents: 'none'
        }} />
        <span style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          fontSize: '11px',
          fontWeight: '600',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: '#ffffff',
          backgroundColor: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(4px)',
          padding: '4px 10px',
          borderRadius: '2px',
          zIndex: 2
        }}>
          {post.category}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: cardSize === 'large' ? '24px' : '18px',
        fontWeight: '600',
        color: 'var(--text-primary)',
        lineHeight: '1.3',
        marginBottom: '8px',
        letterSpacing: '-0.3px'
      }}>
        {post.title}
      </h3>

      {/* Excerpt — small cards only */}
      {cardSize === 'small' && (
        <p style={{
          fontSize: '14px',
          color: 'var(--text-secondary)',
          lineHeight: '1.5',
          marginBottom: '12px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {post.excerpt}
        </p>
      )}

      {/* Meta */}
      <p style={{
        fontSize: '12px',
        color: 'var(--text-muted)',
        letterSpacing: '0.5px',
        textTransform: 'uppercase'
      }}>
        {new Date(post.date).toLocaleDateString('en-US', {
          month: 'short', day: 'numeric'
        })} · {post.readTime} · ADITHYA
      </p>

    </Link>
  );
}

export function FeaturedCard({ post }: { post: Post }) {
  if (!post) return null;
  const coverUrl = post.coverImage || getCategoryCoverImage(post.category);

  return (
    <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>

      {/* Large image */}
      <div style={{
        width: '100%',
        aspectRatio: '16/9',
        backgroundColor: getCategoryColor(post.category),
        borderRadius: '4px',
        marginBottom: '24px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <img
          src={coverUrl}
          alt={post.title}
          onError={(e) => {
            e.currentTarget.src = '/blog/cover_machine_learning.jpg';
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.4s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.25) 100%)',
          pointerEvents: 'none'
        }} />
        <span style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          fontSize: '11px',
          fontWeight: '600',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: '#ffffff',
          backgroundColor: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(4px)',
          padding: '4px 10px',
          borderRadius: '2px',
          zIndex: 2
        }}>
          {post.category}
        </span>
      </div>

      {/* Large serif title */}
      <h2 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '28px',
        fontWeight: '700',
        color: 'var(--text-primary)',
        lineHeight: '1.2',
        marginBottom: '12px',
        letterSpacing: '-0.5px'
      }}>
        {post.title}
      </h2>

      <p style={{
        fontSize: '15px',
        color: 'var(--text-secondary)',
        lineHeight: '1.6',
        marginBottom: '16px'
      }}>
        {post.excerpt}
      </p>

      <p style={{
        fontSize: '12px',
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }}>
        {new Date(post.date).toLocaleDateString('en-US', {
          month: 'short', day: 'numeric'
        })} · {post.readTime} · ADITHYA
      </p>

    </Link>
  );
}
