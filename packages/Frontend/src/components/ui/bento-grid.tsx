import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-2 md:auto-rows-[18rem] md:grid-cols-3 ",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento  row-span-1 flex flex-col justify-between space-y-4 rounded-3xl shadow  bg-white p-4 transition duration-200 hover:shadow-4xl shadow-[0px_0px_50px_20px_rgba(0,0,0,0.25)] dark:border-white/[0.2] dark:bg-black dark:shadow-none",
        className,
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="mt-2 mb-2 font-sans font-bold text-neutral-600 text-md dark:text-neutral-200 outfit-regular">
          {title}
        </div>
        <div className="font-sans text-xs font-light text-neutral-600 dark:text-neutral-300 outfit-regular">
          {description}
        </div>
      </div>
    </div>
  );
};
