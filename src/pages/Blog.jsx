import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, Search, Tag } from 'lucide-react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const blogPosts = [
    {
      id: 1,
      title: 'The Secret Behind Our Signature Pizza Sauce',
      excerpt: 'Discover the carefully guarded recipe and techniques that make our pizza sauce so irresistible.',
      content: 'Our signature pizza sauce is the heart of every pizza we serve...',
      author: 'Chef Marco',
      date: '2024-01-15',
      readTime: '5 min read',
      category: 'Recipes',
      image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=500',
      tags: ['pizza', 'sauce', 'recipe', 'italian']
    },
    {
      id: 2,
      title: 'Farm to Table: Our Commitment to Fresh Ingredients',
      excerpt: 'Learn about our partnerships with local farms and our dedication to serving the freshest ingredients.',
      content: 'At Delicious Bites, we believe that great food starts with great ingredients...',
      author: 'Sarah Johnson',
      date: '2024-01-10',
      readTime: '7 min read',
      category: 'Sustainability',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500',
      tags: ['farm-to-table', 'fresh', 'local', 'organic']
    },
    {
      id: 3,
      title: 'New Menu Items: Asian Fusion Delights',
      excerpt: 'Exciting new additions to our menu featuring authentic Asian flavors with a modern twist.',
      content: 'We are thrilled to introduce our new Asian fusion menu items...',
      author: 'Chef Lin',
      date: '2024-01-05',
      readTime: '4 min read',
      category: 'Menu Updates',
      image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=500',
      tags: ['asian', 'fusion', 'new-menu', 'sushi']
    },
    {
      id: 4,
      title: 'The Art of Perfect Burger Preparation',
      excerpt: 'Behind the scenes look at how we prepare our award-winning burgers.',
      content: 'Creating the perfect burger is an art form that requires attention to detail...',
      author: 'Chef Mike',
      date: '2024-01-01',
      readTime: '6 min read',
      category: 'Cooking Tips',
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=500',
      tags: ['burger', 'grilling', 'technique', 'beef']
    },
    {
      id: 5,
      title: 'Seasonal Desserts: Winter Comfort Treats',
      excerpt: 'Warm up with our special winter dessert collection featuring seasonal flavors.',
      content: 'Winter calls for comfort desserts that warm the soul...',
      author: 'Pastry Chef Anna',
      date: '2023-12-20',
      readTime: '3 min read',
      category: 'Desserts',
      image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=500',
      tags: ['desserts', 'winter', 'seasonal', 'comfort']
    },
    {
      id: 6,
      title: 'Customer Spotlight: Food Blogger Review',
      excerpt: 'Read what food blogger @FoodieLife had to say about their dining experience.',
      content: 'We were honored to host renowned food blogger @FoodieLife...',
      author: 'Marketing Team',
      date: '2023-12-15',
      readTime: '2 min read',
      category: 'Reviews',
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=500',
      tags: ['review', 'customer', 'blogger', 'experience']
    }
  ];

  const categories = ['All', 'Recipes', 'Sustainability', 'Menu Updates', 'Cooking Tips', 'Desserts', 'Reviews'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Food Blog</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Stories from our kitchen, cooking tips, and the latest news from Delicious Bites
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 border border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <Link to={`/blog/${post.id}`}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </Link>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                
                <Link to={`/blog/${post.id}`}>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-orange-600 transition-colors">
                    {post.title}
                  </h3>
                </Link>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="w-4 h-4 mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(post.date)}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No posts found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-orange-500 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="mb-6">Subscribe to our newsletter for the latest recipes, cooking tips, and restaurant news.</p>
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

export default Blog;