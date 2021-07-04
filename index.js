const arvish = require("arvish");

const input = arvish.input.replace(/ -i$/g, "");
const nym = arvish.input === input ? "synonyms" : "antonyms";

(async () => {
  const { data } = await arvish.fetch(
    `https://tuna.thesaurus.com/pageData/${input}`
  );
  const definitions = data ? data.definitionData.definitions[0][nym] : [];
  if (definitions.length === 0) {
    return arvish.log(`No ${nym} found for "${input}"`);
  }
  
  const items = definitions.map(item => ({
    title: item.term,
    subtitle: `Similarity: ${item.similarity}`,
    arg: item.term
  }));
  
  arvish.output(items);
}) ();
