import mongoose from 'mongoose';

interface IPackage {
    name: string;
    price: number;
    startDate: Date;
    profit: number;
}

const packageSchema=new mongoose.Schema<IPackage>({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    startDate:{type:Date,required:true},
    profit:{type:Number,required:true}
});

const Package=mongoose.model<IPackage>('Package',packageSchema);