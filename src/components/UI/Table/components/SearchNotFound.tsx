import { Paragraph } from "../..";

interface SearchNotFound {
  searchQuery: string;
}

const SearchNotFound = ({ searchQuery = "", ...other }: SearchNotFound) => {
  return (
    <div {...other}>
      <Paragraph>Empty List...</Paragraph>
      <Paragraph>
        No results found for &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>
      </Paragraph>
    </div>
  );
};

export { SearchNotFound };
