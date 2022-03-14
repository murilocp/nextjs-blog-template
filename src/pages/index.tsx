import { FC } from 'react';
import { GetStaticProps } from 'next';

import { createClient } from '../../prismicio';

import SEO from '../components/SEO';

const Home: FC = () => {
  return (
    <div>
      <SEO title="Home" />

      <h1>Blog</h1>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  const client = createClient({ ...context });

  let blogHome = null;
  try {
    blogHome = await client.getSingle('blog-home');
  } catch {
    // TODO
  }

  const posts = await client.getAllByType('post', {
    orderings: [{ field: 'my.post.date', direction: 'desc' }],
  });

  return {
    props: { blogHome, posts },
  };
};
export default Home;
