import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose'

import { Abstract } from '../schema/abstract-document.schema'

@Injectable()
export abstract class AbstractRepository<TDocument extends Abstract> {
  protected abstract readonly logger: Logger
  protected modelName: string

  constructor(protected readonly model: Model<TDocument>) {
    this.modelName = model.modelName
  }

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    try {
      const newDoc = new this.model({
        ...document,
        _id: new Types.ObjectId(),
      })

      const doc = (await newDoc.save()).toJSON() as unknown

      return doc as TDocument
    } catch (error) {
      // log errors
      this.logger.error(`Error creating a new record`)
      this.logger.error(error)

      // handle error types
      if (error.code === 11000) {
        throw new ConflictException(
          `Oops! looks like ${this.modelName} already has a record with the same details you are trying to provide`,
        )
      }

      if (
        error.name.toLowerCase().includes('validation') ||
        error instanceof BadRequestException
      ) {
        throw new BadRequestException(error.message)
      }

      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message)
      }

      throw new InternalServerErrorException(
        `Something unexpected happened while creating a new record, please try again later`,
      )
    }
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const foundDoc = await this.model.findOne(filterQuery, {}, { lean: true })

    if (!foundDoc) {
      this.logger.warn(
        `Record not found on ${this.modelName} collection with filterQuery`,
        filterQuery,
      )

      throw new NotFoundException(
        `Oop! could not find requested record from ${this.modelName}`,
      )
    }

    return foundDoc as unknown as TDocument
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    try {
      const updatedDoc = await this.model.findByIdAndUpdate(
        filterQuery,
        update,
        {
          lean: true,
          new: true,
        },
      )

      if (!updatedDoc) {
        throw new NotFoundException(
          `Oop! failed to update ${this.modelName} record`,
        )
      }

      return updatedDoc as unknown as TDocument
    } catch (error) {
      // log errors
      this.logger.warn(
        `Record not updated on ${this.modelName} collection with filterQuery options: `,
        filterQuery,
      )

      this.logger.error(error)

      // handle error types

      if (
        error.name.toLowerCase().includes('validation') ||
        error instanceof BadRequestException
      ) {
        throw new BadRequestException(error.message)
      }

      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message)
      }

      throw new InternalServerErrorException(
        `Something unexpected happened while updating the record, please try again later`,
      )
    }
  }

  async find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery, {}, { lean: true })
  }
}
