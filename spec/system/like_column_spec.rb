# frozen_string_literal: true

RSpec.describe "Like column" do
  fab!(:theme) { upload_theme_component }
  fab!(:category)
  fab!(:topics) do
    Fabricate
      .times(3, :topic_with_op, category: category)
      .tap { |topics| topics.each { |t| Fabricate(:like, post: t.first_post) } }
  end

  it "renders the likes column" do
    visit "/latest"

    expect(page).to have_css("th.topic-list-data.likes", count: 1)
    expect(page).to have_css("td.topic-list-data.likes", text: "1", count: 3)
  end
end
