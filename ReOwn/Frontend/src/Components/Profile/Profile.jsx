import  { useEffect, useState } from 'react';
import Report from './Report/Report';
export default function Profile() {
  const [Show , setShow] = useState("none")
  const [api, getApi] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => getApi(data.products));
  }, []);

  return (
    <div className="p-6">

      <div className="flex flex-wrap justify-center m-auto gap-3">

        {/* PROFILE CARD */}
        <div
          // style={{ margin: "20px" }}
          className="relative bg-neutral-primary-soft max-w-xs w-full p-6 border border-default rounded-base shadow-xs text-center shadow-md"
        >
          <div className="flex flex-col items-center">
            <img
              className="w-24 h-24 mb-6 rounded-full"
              src="public\images\OIP (3).webp"
              alt="image"
            />
            <h5 className="mb-0.5 text-xl font-semibold tracking-tight text-heading">
              John Smith
            </h5>
            <span className="text-sm text-body">Johnsmith@gmail.com</span>

            <div className="mt-4 md:mt-6 gap-4">
              <a href='edit'
                style={{ borderRadius: "10px", width: "180px" }}
                type="button"
                className="inline-flex w-auto text-body bg-neutral-secondary-medium border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading shadow-xs font-medium text-sm px-4 py-2.5"
              >
              <h2 className='ml-8'> Edit Profile</h2> 
              </a>
              
              <div
                style={{ borderRadius: "10px", width: "180px",margin:"12px" }}
                type="button"
                className="inline-flex w-auto text-body bg-neutral-secondary-medium border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading shadow-xs font-medium text-sm px-4 py-2.5"
              >
                <img
                  className="ml-14"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAABYElEQVR4AeyUYbYBMQyFvbeR9+yElWAlWAlWgpWwE/KpjExPOzI9NfzgNG2aNPc2deb+jt70+yjif3mEZWWbC15rxB3vJXsSW1W2jeCBK0sYlphbTUL4JbO+5A3cEv/dIgNNlnggykDzJQ7vMMDsfeqD3OXnbmNZz2I6yC1kQ57cVvynw0s8NUiQrs1+J76SxTlJpYeHmI7S1SEKWfDCzP5ZzchDzIcfIB+z/eZnj3DjpWqaJI6XGClF1QBE4ZBU6jHiaDs+ec6yss+ah5hiwAFEb9FdYmqQcJGLBMhzVtzu4SXuRinIfokLHq2sxD71sQyiV1XDYYn56LFeSD0Ot4TFEoOBNKK7fB5qKofkU0Zez+ZWMNHxpj4mJgEQWqyGFhOPjQ70ono2t4LZqk8Rtw5kNnRGB8V/TV9iuoSQzjJ38oW9xBBql/g+9I5THmKIqnRp7+EltjVVfA9xFaIY5AoAAP//RNs0UQAAAAZJREFUAwAuG0s9rRklLQAAAABJRU5ErkJggg=="
                />
              </div>
              <button
              onClick={()=>{setShow("flex")}}
                style={{ borderRadius: "10px", width: "180px",margin:"12px" }}
                type="button"
                className='text-blue-800 underline decoration-solid'
              >
              <a>Report User</a>
              
              </button>
            </div>
          </div>
        </div>

        {/* RATE SECTION */}
        <div>
          <div className="flex ml-14 mb-8 mt-8 ">
            <h1 className="text-2xl font-bold">Rate</h1>

            <div className="flex ml-14">
              {[...Array(5)].map((i) => (
                <img
                  key={i}
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAABnklEQVR4AdSWjVHDMAxGfUwCkwCTAJMAk8AmsAlsAnpu5Pha/dRuer32rFiV9elZaeLrTbnQ5yrBz3KzMJnGx2zHD4L6WAxf3LExC37tML3fhWN3BkyHmFbGx/T7UfMM+MmobMWMtDU0A7YeKDq+Xcvm3ijY+z2BemvmLkbBb2aVXZCud94R130wYnaO6evyJXV+xP7EokHX5GFoVE8tfh6s6XswCwjoCuM7xmYo2kSBQx6GBi1GLd0E8Srvwb81ct5LY/Tgb2GyO5nOMh6lqgmWeHmXy4vY1gMojbW6fcca/BRnKzgdHkClfrHAxLeAu1AAHpi1U+Dc1jspAlymwxGByQbOPGouUAtlYN5DzR2Z2/vqiTKwp8vieoi4eRn43lXmC6E2A6e3LOCH2gzMLbNq61PLk4tv5XjamhuBvQeLY5VDgScXwydWC3YXwG7XEXj/N6IzOuRY7epXlxhr5NTAcnH/EkVgdrzoCx3RGR0W58MaOeQ6KWs4AnNeY3RCR6sq9shFgxYzsyMwHXByMZviIIgGrZsSgV3RFgv/AAAA//9KfemQAAAABklEQVQDAGGJPj3CsYxrAAAAAElFTkSuQmCC"
                  alt="star"
                />
              ))}
            </div>
          </div>

          {/* TABLE */}
          <div className="relative overflow-x-auto overflow-y-auto h-96 bg-neutral-primary-soft shadow-xs rounded-base border border-default grow shadow-md ">

            <div className="p-4">
              <h1 className="text-2xl font-bold">My Recent Ads</h1>
            </div>

            <table className=" text-sm text-left border-collapse">
              <thead className="text-sm bg-gray border-b sticky top-0 z-10 ">
                <tr>
                  <th className="px-6 py-3">Photo</th>
                  <th className="px-6 py-3 text-center">Title</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {api.map((element) => (
                  <tr
                    key={element.id}
                    className="bg-neutral-primary-soft border-b hover:bg-neutral-secondary-medium"
                  >
                    <td className="p-4">
                      <img
                        src={element.images[0]}
                        alt="img"
                        className="w-14 h-14 rounded"
                      />
                    </td>

                    <td className="px-6 py-4 text-center">{element.title}</td>
                    <td className="px-6 py-4">{element.category}</td>

                    <td className="">
                      <span className="px-3 py-1 bg-green-300 rounded">
                        ${element.price}
                      </span>
                    </td>

                    <td className="">
                      <span className="px-3 py-1 bg-green-300 rounded">
                      panding
                      </span>
                    </td>

                  
                  
                    <td className="px-6 py-4 text-fg-brand hover:underline cursor-pointer">
                    Eidit/ Delete
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>

      </div>
      <Report display={Show} setDisplay={setShow}/>
    </div>
  );
}