import { HttpException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/serives/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createProductDto: CreateProductDto, idUser: number) {
    return this.prisma.post.create({
      data: {
        title: createProductDto.title,
        description: createProductDto.description,
        value: createProductDto.value,
        images: JSON.stringify(createProductDto.images),
        date: createProductDto.date,
        catergory: {
          connect: {
            category_id: createProductDto.category_id,
          },
        },
        user: {
          connect: {
            id: idUser,
          },
        },
      },
    });
  }

  findAll(idUser: number) {
    return this.prisma.post.findMany({
      where: {
        user: {
          id: idUser,
        },
      },
    });
  }

  async findOne(id: number, idUser: number) {
    return this.prisma.post
      .findUniqueOrThrow({
        where: {
          id: id,
          user: {
            id: idUser,
          },
        },
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new HttpException('Post not found', 404);
        }
        throw error;
      });
  }

  async update(id: number, updateProductDto: UpdateProductDto, idUser: number) {
    return this.prisma.post
      .update({
        where: { id: id, user: { id: idUser } },
        data: {
          title: updateProductDto.title,
          description: updateProductDto.description,
          value: updateProductDto.value,
          category_id: updateProductDto.category_id,
          images: JSON.stringify(updateProductDto.images),
          date: updateProductDto.date,
        },
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new HttpException('Post not found', 404);
        }
        throw error;
      });
  }

  async remove(id: number, idUser: number) {
    return this.prisma.post
      .delete({
        where: { id: id, user: { id: idUser } },
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new HttpException('Post not found', 404);
        }
        throw error;
      });
  }
}
