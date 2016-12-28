/* @flow */

type Identifier = string;
type OperationEnum = 'add';

type State = {
  units: [UnitType]
}

type OperationType = {
  unit: UnitType;
  after: ?UnitType;
  op: OperationEnum;
}

type UnitType = {
  identifier: Identifier;
  value: string;
}
