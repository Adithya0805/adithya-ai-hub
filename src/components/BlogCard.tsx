import type { Post } from "@/data/posts";

export type BlogPost = Post;

export interface BlogCardProps {
  post: Post;
  size?: 'small' | 'large';
  featured?: boolean;
}

// Category background colors (warm tones)
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
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

export function BlogCard({ post, size = 'small', featured }: BlogCardProps) {
  const cardSize = featured ? 'large' : size;
  return (
    <a
      href={`/blog/${post.slug}`}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      {/* Thumbnail — placeholder image based on category */}
      <div style={{
        width: '100%',
        aspectRatio: cardSize === 'large' ? '16/9' : '4/3',
        backgroundColor: getCategoryColor(post.category),
        borderRadius: '4px',
        marginBottom: '16px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Category label on image */}
        <span style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          fontSize: '11px',
          fontWeight: '600',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: '#ffffff',
          backgroundColor: 'rgba(0,0,0,0.4)',
          padding: '4px 10px',
          borderRadius: '2px'
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

    </a>
  );
}

export function FeaturedCard({ post }: { post: Post }) {
  if (!post) return null;
  return (
    <a href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>

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
        <span style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          fontSize: '11px',
          fontWeight: '600',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: '#ffffff',
          backgroundColor: 'rgba(0,0,0,0.4)',
          padding: '4px 10px',
          borderRadius: '2px'
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

    </a>
  );
}
