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
    sortByText: "votes",
    orderText: "High - Low",
    order: "desc",
    sort_by: "votes",
  },
  {
    sortByText: "votes",
    orderText: "Low - High",
    order: "asc",
    sort_by: "votes",
  },
  {
    sortByText: "comment count",
    orderText: "High - Low",
    order: "desc",
    sort_by: "comment_count",
  },
  {
    sortByText: "comment count",
    orderText: "Low - High",
    order: "asc",
    sort_by: "comment_count",
  },
];

export default sortOptions;
