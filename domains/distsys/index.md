---
title: Distributed Systems
---

::: tip
This article was written by Anirudh Rowjee, who you'll find on our Discord Server!
:::

> Hint: By accessing this article over the internet, you're already making use of Distributed Systems!

## What are Distributed Systems?

A distributed system can be defined as a system whose components are located on
1. Different
2. Networked
computers.

These communicate by passing messages to each other by means of a network, and co-ordinate to get a task done.

In essence, it's a system that takes advantage of multiple instances of compute to process as much as possible, while meeting a very specific set of constraints.

So, consider any task that you do on your computer - such as, say, Calculating the inverse of  a matrix. A *Distributed Algorithm* for computing the inverse of a matrix is one that would make use of many computers that can speak to each other to perform this computation faster. 

## Distributed vs Parallel

Distributed Systems and Parallel Systems are not the same!
* In a distributed system, the smallest unit of compute is a network-attached computer, and nodes in a Distributed System do not Share Memory.
* In a parallel system, the smallest unit of compute is a thread (not an entire system), and nodes in a parallel system usually have access to the same memory.

## Embarrassingly Parallelizable Problems

Amdahl's Law discusses a class of problems known as Embarrassingly Parallelizable Problems.

Consider the example of counting the words in a large text document. At this point, to design a system to solve this kind of problem, we must first begin to divide our problem into smaller chunks that can be solved by the smallest unit of compute.

How would we approach this? Perhaps we can have two computers, each of which will count the words in half of the document. At this point, you might argue - well, doesn't seem like it's very useful to use only 2! if you take a very large document, that might be low too.

Then I say, okay, how about 300? Would that make sense? Technically speaking, you can divide a large document into 300 parts, and spin up a computer for each of them. Or maybe you want to be closer to the idea word count, and spin up about ~600 computers to break the document into 600 pieces and count the words in each of them. 

While all these are technically possible, one can imagine that at some point you will begin wasting the resources on each of these computers - perhaps you don't _need_ 600 computers, and 300 computers can handle this kind of computation easily. In fact, you might find that using 600 computers takes *more* time to finish the calculation you want to finish!

## Why Distributed Systems?

There may be multiple reasons that you might need to convert a regular system into a distributed system.

1. More Power - sometimes you just need that much processing power that you can't get via a single processor.
2. Efficiency - some problems might be cheaper to run, or might run faster on a distributed system. Perhaps the object you want to operate on might not really fit into the memory of a single compute instance, and you might need to  use more computers in a distributed system to do that efficiently (not all of us can buy a supercomputer).
3. Reach and connectivity - sometimes you just don't have that much compute, or you want to speak to another computer somewhere to solve a problem somewhere, a computer that someone else owns. Case in point - the internet is a distributed system, perhaps the earliest one in existance.

## Who uses distributed systems?

We all do, every single day!

## Further Reading
1. The Paxos and Raft Consensus Protocol
2. Byzantine Fault Tolerance
4. Vector Clocks
