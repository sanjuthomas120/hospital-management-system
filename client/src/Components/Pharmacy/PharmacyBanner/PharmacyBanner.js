import React from 'react';

const PharmacyBanner = () => {
  const blogPosts = [
    {
      id: 1,
      date: { day: '09', month: 'May' },
      title: 'Understanding Medication Management',
      author: 'Health Team',
      image: 'https://th.bing.com/th/id/OIP.aWR8mv-UYWZhukPesEJPUgHaEK?w=320&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      alt: 'Medicine management illustration'
    },
    {
      id: 2,
      date: { day: '07', month: 'May' },
      title: 'Essential Vitamins and Supplements Guide',
      author: 'Wellness Staff',
      image: 'https://th.bing.com/th/id/OIP.eEknQpmdbaT-NPIaadS6EgHaE8?w=237&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      alt: 'Vitamins and supplements'
    },
    {
      id: 3,
      date: { day: '06', month: 'May' },
      title: 'Natural Remedies for Better Sleep',
      author: 'Health Team',
      image: 'https://th.bing.com/th/id/OIP.1pI1rQGqxHLS1XFKytT-OAHaE8?w=264&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      alt: 'Natural sleep remedies'
    }
  ];

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl font-serif text-center mb-12">Welcome Pharmacy</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <article key={post.id} className="group cursor-pointer">
            <div className="relative overflow-hidden">
              {/* Date Badge */}
              <div className="absolute top-4 left-4 bg-white p-2 rounded shadow-lg z-10">
                <div className="text-center">
                  <span className="block text-lg font-bold">{post.date.day}</span>
                  <span className="block text-sm text-gray-600">{post.date.month}</span>
                </div>
              </div>
              
              {/* Image */}
              <div className="aspect-w-16 aspect-h-12 overflow-hidden rounded-lg">
                <img 
                  src={post.image}
                  alt={post.alt}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
            
            {/* Content */}
            <div className="mt-4">
              <div className="text-sm text-gray-500 mb-2">BY {post.author}</div>
              <h3 className="text-xl font-serif group-hover:text-blue-600 transition-colors duration-200">
                {post.title}
              </h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PharmacyBanner;