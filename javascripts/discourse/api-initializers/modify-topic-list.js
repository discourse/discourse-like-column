import HeaderLikesCell from "discourse/components/topic-list/header/likes-cell";
import ItemLikesCell from "discourse/components/topic-list/item/likes-cell";
import { apiInitializer } from "discourse/lib/api";
import { withSilencedDeprecations } from "discourse-common/lib/deprecated";

export default apiInitializer("0.8", (api) => {
  api.registerValueTransformer("topic-list-columns", ({ value: columns }) => {
    if (!columns.has("likes")) {
      columns.add(
        "likes",
        {
          header: HeaderLikesCell,
          item: ItemLikesCell,
        },
        {
          after: "replies",
          before: "views",
        }
      );
    }
    return columns;
  });

  withSilencedDeprecations("discourse.hbr-topic-list-overrides", () => {
    api.modifyClass("component:topic-list", {
      showLikes: true,
    });
  });
});
