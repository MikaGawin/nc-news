const sortOptions = [
  {
    sortByText: "date",
    orderText: "new - old",
    order: "desc",
    sort_by: "created_at",
  },
  {
    sortByText: "date",
    orderText: "old - new",
    order: "asc",
    sort_by: "created_at",
  },
  {
    sortByText: "title",
    orderText: "A - Z",
    order: "asc",
    sort_by: "title",
  },
  {
    sortByText: "title",
    orderText: "Z - A",
    order: "desc",
    sort_by: "title",
  },
  {
    sortByText: "author",
    orderText: "Z - A",
    order: "desc",
    sort_by: "author",
  },
  {
    sortByText: "author",
    orderText: "A - Z",
    order: "asc",
    sort_by: "author",
  },
  {
    sortByText: "likes",
    orderText: "Most - Least",
    order: "desc",
    sort_by: "votes",
  },
  {
    sortByText: "likes",
    orderText: "Most - Least",
    order: "asc",
    sort_by: "votes",
  },
  {
    sortByText: "comments",
    orderText: "Most - Least",
    order: "desc",
    sort_by: "comment_count",
  },
  {
    sortByText: "comments",
    orderText: "Most - Least",
    order: "asc",
    sort_by: "comment_count",
  },
];

export default sortOptions;
