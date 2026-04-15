// components/ui/Title.tsx
type TitleProps = {
  text: string;
};

const Title = ({ text }: TitleProps) => {
  return (
    <h1 className="text-2xl font-bold mb-6">
      {text}
    </h1>
  );
};

export default Title;