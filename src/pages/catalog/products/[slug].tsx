import { client } from '@/lib/primisc';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Document } from 'prismic-javascript/types/documents';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';

interface ProductProps {
  product: Document;
}

// import dynamic from 'next/dynamic';


// const AddToCartModal = dynamic(() => import('@/components/AddToCartModal'), {
//   loading: () => <p>Loading...</p>, ssr: false
//   // srr: false -> it makes the components be rendering on client-side
// })

// export default function Product() {
//   const router = useRouter();
//   const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false);

//   function handleAddToCart() {
//     setIsAddToCartModalVisible(true)
//   }

//   return (
//     <div>
//       <h1>{router.query.slug}</h1>

//       <button onClick={handleAddToCart}>Add to Cart</button>

//       { isAddToCartModalVisible && <AddToCartModal /> }
//     </div>
//   )
// }

export default function Product({product}: ProductProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>
        {PrismicDOM.RichText.asText(product.data.title)}
      </h1>

      <img src={product.data.thumbnail.url} width="200"  alt=""/>

      <div dangerouslySetInnerHTML={{ __html: PrismicDOM.RichText.asHtml(product.data.description)}} ></div>
      <p>Price: ${product.data.price}</p>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<ProductProps> = async (context) => {
  const { slug } = context.params;

  const product = await client().getByUID('product', String(slug), {});

  return {
    props: {
      product,
    },
    revalidate: 10,
  }
}