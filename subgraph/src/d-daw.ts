import {
  NewPhrase as NewPhraseEvent,
  NewTrack as NewTrackEvent
} from "../generated/DDaw/DDaw"
import { NewPhrase, NewTrack } from "../generated/schema"

export function handleNewPhrase(event: NewPhraseEvent): void {
  let entity = new NewPhrase(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.phrase = event.params.phrase
  entity.owner = event.params.owner
  entity.royalty = event.params.royalty

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewTrack(event: NewTrackEvent): void {
  let entity = new NewTrack(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.name = event.params.name
  entity.phrases = event.params.phrases
  entity.cost = event.params.cost

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
