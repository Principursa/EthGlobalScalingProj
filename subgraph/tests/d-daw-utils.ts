import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { NewPhrase, NewTrack } from "../generated/DDaw/DDaw"

export function createNewPhraseEvent(
  phrase: string,
  owner: Address,
  royalty: BigInt
): NewPhrase {
  let newPhraseEvent = changetype<NewPhrase>(newMockEvent())

  newPhraseEvent.parameters = new Array()

  newPhraseEvent.parameters.push(
    new ethereum.EventParam("phrase", ethereum.Value.fromString(phrase))
  )
  newPhraseEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  newPhraseEvent.parameters.push(
    new ethereum.EventParam(
      "royalty",
      ethereum.Value.fromUnsignedBigInt(royalty)
    )
  )

  return newPhraseEvent
}

export function createNewTrackEvent(
  name: string,
  phrases: Array<string>,
  cost: BigInt
): NewTrack {
  let newTrackEvent = changetype<NewTrack>(newMockEvent())

  newTrackEvent.parameters = new Array()

  newTrackEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  newTrackEvent.parameters.push(
    new ethereum.EventParam("phrases", ethereum.Value.fromStringArray(phrases))
  )
  newTrackEvent.parameters.push(
    new ethereum.EventParam("cost", ethereum.Value.fromUnsignedBigInt(cost))
  )

  return newTrackEvent
}
