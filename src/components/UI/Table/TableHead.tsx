interface IProps {
  name: string;
  order: number;
}

export default function TableHead({ headItems }: { headItems: IProps[] }) {
  return (
    <thead>
      <tr>
        {headItems.map((item) => (
          <th
            key={item.order}
            className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
          >
            {item.name}
          </th>
        ))}
      </tr>
    </thead>
  );
}
