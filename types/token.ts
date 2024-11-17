export interface TokenData {
  id: string;
  name: string;
  ticker: string;
  price: string;
  change: string;
  marketCap: string;
  volume: string;
  holders: string;
  description: string;
  image: string;
  social: {
    twitter: string;
    telegram: string;
    website: string;
  };
  priceData: Array<{
    time: string;
    price: number;
  }>;
  comments: Array<{
    id: string;
    user: string;
    content: string;
    timestamp: string;
    avatar: string;
  }>;
}