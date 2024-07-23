interface User {
  email: string;
  image: string;
  name: string;
  accessToken: string;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
}
