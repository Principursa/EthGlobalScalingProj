import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { NewPhrase } from "../generated/schema"
import { NewPhrase as NewPhraseEvent } from "../generated/DDaw/DDaw"
import { handleNewPhrase } from "../src/d-daw"
import { createNewPhraseEvent } from "./d-daw-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let phrase = "Example string value"
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let royalty = BigInt.fromI32(234)
    let newNewPhraseEvent = createNewPhraseEvent(phrase, owner, royalty)
    handleNewPhrase(newNewPhraseEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("NewPhrase created and stored", () => {
    assert.entityCount("NewPhrase", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "NewPhrase",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "phrase",
      "Example string value"
    )
    assert.fieldEquals(
      "NewPhrase",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "NewPhrase",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "royalty",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
