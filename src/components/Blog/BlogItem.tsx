import React from "react";

const BlogItem = () => {
  return (
    <article className="overflow-hidden border border-gray-100 bg-white shadow-sm">
      <img
        alt="Office"
        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        className="h-56 w-full object-cover"
      />
      <div className="p-4 sm:p-6">
        <a href="#">
          <h3 className="text-[16px] font-medium text-gray-900">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
        </a>
        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 text-xs">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
          dolores, possimus pariatur animi temporibus nesciunt praesentium
          dolore sed nulla ipsum eveniet corporis quidem, mollitia itaque minus
          soluta, voluptates neque explicabo tempora nisi culpa eius atque
          dignissimos. Molestias explicabo corporis voluptatem?
        </p>
        <a
          href="#"
          className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#1cc0a0]"
        >
          Find out more
          <span
            aria-hidden="true"
            className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
          >
            →
          </span>
        </a>
      </div>
    </article>
  );
};

export default BlogItem;
