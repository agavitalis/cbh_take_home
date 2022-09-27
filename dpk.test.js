const { deterministicPartitionKey } = require("./dpk");

function generateRandomString(length) {
  var output           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var x = 0; x < length; x++ ) {
    output += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return output;
}



describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Does NOT return literal '0' partition key does not exist", () => {
    const trivialKey = deterministicPartitionKey({ foo: "bar" });
    expect(trivialKey).not.toBe("0");
  });

  it("Returns the literal 'foo' when partition key is of type string", () => {
    const trivialKey = deterministicPartitionKey({
      partitionKey: "foo",
    });
    expect(trivialKey).toBe("foo");
  });

  it("Does NOT return the literal '0' when partition key is NOT of type string", () => {
    const trivialKey = deterministicPartitionKey({
      partitionKey: 1,
    });
    expect(trivialKey).not.toBe("0");
  });

  it("Ensure MAX_PARTITION_KEY_LENGTH is always greater than candidate length", () => {
    const dummyData = generateRandomString(300);
    const trivialKey = deterministicPartitionKey({
      partitionKey: { foo: dummyData },
    });
    expect(trivialKey.length).not.toBe(dummyData.length);
  });

  it("Ensure candidate length is 128, when partition key is greater than MAX_PARTITION_KEY_LENGTH", () => {
    const dummyData = generateRandomString(300);
    const trivialKey = deterministicPartitionKey({
      partitionKey: { foo: dummyData },
    });
    expect(trivialKey.length).toBe(128);
  });

  it("Returns the literal '123' when partition key is of type number", () => {
    const trivialKey = deterministicPartitionKey({
      partitionKey: 123,
    });
    expect(trivialKey).toBe("123");
  });

  it("Returns the literal 'true' when partition key is of type boolean", () => {
    const trivialKey = deterministicPartitionKey({
      partitionKey: true,
    });
    expect(trivialKey).toBe("true");
  });

  it("Does NOT return literal '0' when partition key does not exist but Null", () => { 
    const trivialKey = deterministicPartitionKey({
      partitionKey: null,
    });
    expect(trivialKey).not.toBe("0");
  })

  it("Does NOT return literal '0' when partition key does not exist but Undefined", () => {
    const trivialKey = deterministicPartitionKey({
      partitionKey: undefined,
    });
    expect(trivialKey).not.toBe("0");
  })

  it("Does NOT return literal '0' when partition key does not exist but Empty String", () => {
    const trivialKey = deterministicPartitionKey({
      partitionKey: "",
    });
    expect(trivialKey).not.toBe("0");
  });

  it("Does NOT return literal '0' when partition key does not exist but Empty Array", () => {
    const trivialKey = deterministicPartitionKey({
      partitionKey: [],
    });
    expect(trivialKey).not.toBe("0");
  })

});
