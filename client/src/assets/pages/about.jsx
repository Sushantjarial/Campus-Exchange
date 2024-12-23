// // src/components/About.js
// export default function About() {
//     return (
//       <section id="about-section" className="bg-white dark:bg-gray-800 p-10 text-center py-64">
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4 ">About Us</h2>
//         <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
//           Campus Exchange is your go-to platform for connecting with fellow students to buy, sell, and exchange items. Whether you're looking for textbooks, gadgets, or
//           other essentials, Campus Exchange provides a safe and friendly marketplace designed exclusively for your campus community.
//         </p>
//       </section>
//     );
//   }
  
export default function About() {
  return ( <div className="">
    <section id="about-section" className="bg-white dark:bg-gray-800 p-16 text-center pt-20 b-40 ">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200  font-sans ">
        About Us
      </h2>
      <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-serif pt-10 pb-3">
        Welcome to <span className="font-bold text-blue-600">Campus Exchange</span> - a platform created by students, for students! Campus Exchange is designed to make it easier for students to buy, sell, and trade items like textbooks, gadgets, and daily essentials within their college community.
      </p>
      <p className="mt-6 text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-serif ">
        We prioritize security and a user-friendly experience, allowing you to connect with trusted peers on campus. Whether you're a freshman or a senior, Campus Exchange helps you find what you need while supporting a sustainable, community-driven marketplace.
      </p>
    </section>
    <div className="p-32 bg-white dark:bg-gray-800"></div>
    </div>
  );
}
