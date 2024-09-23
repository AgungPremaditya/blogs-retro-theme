
interface Blog {
    id: string;
    title: string;
    content: string;
  }

  
const BlogDetail = ({ params }: { params: { blog_id: string } }) => {
    const blogId = params.blog_id;

  
    if (!blogId) {
      return <div>Loading...</div>;
    }
  
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-4xl sm:text-6xl font-bold">{blogId}</h1>
        </div>
    );
};
  
export default BlogDetail;