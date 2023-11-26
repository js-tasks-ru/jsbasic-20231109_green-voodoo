function makeFriendsList(friends) {
  // ваш код...
  if (!Array.isArray(friends) || friends.length < 1) return "";

  let tagUl = document.createElement("ul");

  for (let friend of friends) {
    let liLast = document.createElement("li");
    liLast.innerHTML = friend.firstName + " " + friend.lastName;
    tagUl.append(liLast);
  }

  return tagUl;
}
