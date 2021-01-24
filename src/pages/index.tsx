import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { Title } from '../styles/pages/Home';
import SEO from '../components/SEO';
import { client } from '@/lib/primisc';
import Primisc from 'prismic-javascript';
import { Document } from 'prismic-javascript/types/documents';
import PrismicDOM from 'prismic-dom'
interface HomeProps {
  recommendedProducts: Document[];
}

export default function Home({recommendedProducts}:HomeProps) {
  // dynamic import 
  // async function handleSum() {
  //   const math = (await import('../lib/math')).default;
  //   alert(math.sum(3,5));
  // }

  return (
    <div>
      <SEO 
        title="ExpressDEV, the best way you can buy anything!"
        image="boost.png"
        description="ExpressDEV is the place that everyone can find Dev's T-SHIRTS"
        shouldExcludeTitleSuffix 
      />

      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>
                <Link href={`catalog/products/${recommendedProduct.uid}` }>
                  <a>
                    {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* <button onClick={handleSum}>Sum</button> */}
    </div>
  )
}

// methods data fetch on NextJs -> client side, server side, static side generation

// -> serve side example
// export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
//   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`);
//   const recommendedProducts = await response.json();

//   return {
//     props: {
//       recommendedProducts
//     }
//   }
// }

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recommendedProducts = await client().query([
    Primisc.Predicates.at('document.type', 'product')
  ])

  return {
    props: {
      recommendedProducts: recommendedProducts.results
    }
  }
}
