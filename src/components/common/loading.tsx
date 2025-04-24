import { GridLoader } from 'react-spinners';

interface LoadingProps {
  loading?: boolean;
  color?: string;
  size?: number;
  margin?: number;
  fullScreen?: boolean;
}

export function Loading({
  loading = true,
  color = 'rgb(var(--color-mikado-yellow))',
  size = 20,
  margin = 5,
  fullScreen = false,
}: LoadingProps) {
  const loader = (
    <GridLoader
      loading={loading}
      color={color}
      size={size}
      margin={margin}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[rgb(var(--color-rich-black))] bg-opacity-50 backdrop-blur-sm z-50">
        {loader}
      </div>
    );
  }

  return <div className={'inline-flex items-center justify-center'}>{loader}</div>;
}

