const article = new Article({
  title: "Neural networks",
  contentHTML:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  author: "Simba Shi",
  datePublished: "2022-08-01",
  categories: ["Artificial Intelligence", "Computer Science"],
  views: 6969,
  thumbnailUrl:
    "https://yt3.ggpht.com/C1x5KJWWQW_JoHQCEEaqpXU6hkII-6kWRTUk8Urg25tE-ZLrKK11WWlKBhfGwt-ZzseGsvYwcXU=s900-c-k-c0x00ffffff-no-rj",
});
article.save();
