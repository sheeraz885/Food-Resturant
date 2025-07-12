import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Clock, Tag, ArrowLeft, Share2, Heart } from 'lucide-react';

const BlogPost = () => {
  const { id } = useParams();
  
  // Mock blog post data (in real app, this would come from API)
  const post = {
    id: 1,
    title: 'The Secret Behind Our Signature Pizza Sauce',
    content: `
      <p>Our signature pizza sauce is the heart of every pizza we serve at Delicious Bites. After years of perfecting the recipe, we're excited to share some of the secrets behind what makes it so special.</p>
      
      <h2>The Foundation: Quality Tomatoes</h2>
      <p>Everything starts with the tomatoes. We use only the finest San Marzano tomatoes, known for their sweet flavor and low acidity. These tomatoes are grown in the volcanic soil of Mount Vesuvius, which gives them their distinctive taste.</p>
      
      <h2>The Perfect Blend of Herbs</h2>
      <p>Our herb blend is what sets our sauce apart. We combine fresh basil, oregano, thyme, and a touch of rosemary. Each herb is carefully measured to create the perfect balance of flavors.</p>
      
      <h2>The Slow Cooking Process</h2>
      <p>We simmer our sauce for hours at low temperature, allowing the flavors to meld together perfectly. This slow cooking process intensifies the taste and creates the rich, complex flavor profile that our customers love.</p>
      
      <h2>The Secret Ingredient</h2>
      <p>While we can't reveal all our secrets, we can tell you that our sauce includes a special ingredient that has been passed down through generations in our head chef's family. This ingredient adds depth and complexity that you won't find anywhere else.</p>
      
      <h2>Made Fresh Daily</h2>
      <p>We make our sauce fresh every single day. This commitment to freshness ensures that every pizza that leaves our kitchen has the best possible sauce, made with love and attention to detail.</p>
      
      <p>Next time you visit Delicious Bites, you'll know that every bite of your pizza contains hours of careful preparation and decades of culinary tradition.</p>
    `,
    author: 'Chef Marco',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Recipes',
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['pizza', 'sauce', 'recipe', 'italian']
  };

  const relatedPosts = [
    {
      id: 2,
      title: 'Farm to Table: Our Commitment to Fresh Ingredients',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300',
      date: '2024-01-10'
    },
    {
      id: 3,
      title: 'New Menu Items: Asian Fusion Delights',
      image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=300',
      date: '2024-01-05'
    },
    {
      id: 4,
      title: 'The Art of Perfect Burger Preparation',
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=300',
      date: '2024-01-01'
    }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          to="/blog"
          className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover"
          />
          
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">
                {post.category}
              </span>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {post.readTime}
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-between mb-8 pb-6 border-b">
              <div className="flex items-center space-x-6">
                <div className="flex items-center text-gray-600">
                  <User className="w-5 h-5 mr-2" />
                  {post.author}
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  {formatDate(post.date)}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleShare}
                  className="flex items-center text-gray-600 hover:text-orange-600 transition-colors"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </button>
                <button className="flex items-center text-gray-600 hover:text-red-600 transition-colors">
                  <Heart className="w-5 h-5 mr-2" />
                  Like
                </button>
              </div>
            </div>
            
            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map(tag => (
                <span key={tag} className="flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* Related Posts */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map(relatedPost => (
              <Link
                key={relatedPost.id}
                to={`/blog/${relatedPost.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={relatedPost.image}
                  alt={relatedPost.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(relatedPost.date)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-orange-500 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Enjoyed this post?</h3>
          <p className="mb-6">Subscribe to our newsletter for more recipes, cooking tips, and restaurant updates.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
            <button className="px-6 py-2 bg-white text-orange-500 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;