import { Iblog } from "../../interface/Iblog";
const BlogItem = ({ data }: { data: Iblog }) => {
  return (
    <article className="overflow-hidden border border-gray-100 bg-white shadow-sm">
      <img alt="Office" src={data.image} className="h-56 w-full object-cover" />
      <div className="p-4 sm:p-6">
        <a href="#">
          <h3 className="text-[16px] font-medium text-gray-900">
            {data.title}
          </h3>
        </a>
        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 text-xs">
          {data.extract}
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
